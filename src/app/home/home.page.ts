import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) { }

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    this.showMessage(`IMC = ${imc.toFixed(2)}`);

    this.exibirInterpretacaoIMC(this.interpretarIMC(imc));
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }

  exibirInterpretacaoIMC(interpretacao: string) {
    let trs = document.getElementsByTagName("tr");
    for (let i = 0; i < trs.length; i++) {
      if (trs[i].id == interpretacao)
        trs[i].setAttribute("style", "background-color: var(--ion-color-light-tint); color: var(--ion-color-light-contrast);");
      else
        trs[i].setAttribute("style", "");
    }
  }

  interpretarIMC(imc: number) {
    if (imc < 18.5)
      return "magreza";
    else if (imc < 25)
      return "normal";
    else if (imc < 30)
      return "sobrepeso";
    else if (imc < 40)
      return "obesidade";
    else
      return "obesidade_grave";
  }
}
