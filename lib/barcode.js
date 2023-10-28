import JsBarcode from "jsbarcode";

export default function generateBarcode(canvasId, barcodeValue) {
  JsBarcode(`#${canvasId}`, barcodeValue, {
    format: "CODE128",
    width: 2,
    height: 30,
    displayValue: true,
  });
}
