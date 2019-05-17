import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunkoStoreService } from '../shared/service/funko-store.service';

declare var Quagga: any;

@Component({
  selector: 'funko-code-reader',
  templateUrl: './funko-code-reader.component.html',
  styleUrls: ['./funko-code-reader.component.scss']
})
export class FunkoCodeReaderComponent implements OnInit, OnDestroy {
  constructor(private funkoStore: FunkoStoreService) {}

  ngOnInit() {
    this.initBarcodeScanner();
  }

  ngOnDestroy(): void {
    Quagga.stop();
  }

  /**
   * Test code for analysis
   *
   * @memberof AppComponent
   */
  initBarcodeScanner() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('funko-code-reader'),
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            aspectRatio: { min: 1, max: 100 },
            facingMode: 'environment' // or "user" for the front camera
          }
        },
        locator: {
          patchSize: 'large',
          halfSample: false
        },
        numOfWorkers: navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4,
        decoder: {
          readers: ['upc_reader']
        },
        locate: true
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();
      }
    );

    Quagga.onProcessed(function(result) {
      const drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });

    Quagga.onDetected(obj => {
      const code: string = obj.codeResult.code;
      Quagga.stop();
      this.funkoStore.setQuery(code.toLowerCase());
    });
  }
}
