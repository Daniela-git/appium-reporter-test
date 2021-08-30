export class Alerts {
  get app() {
    return $('~App');
  }

  get alertDialog() {
    return $('~Alert Dialogs');
  }
  get getTitle() {
    return $('.android.widget.TextView').getText();
  }
}
