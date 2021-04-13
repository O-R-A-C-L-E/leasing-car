export const Calculator = {

    calculate(calcSliders) {
        calcSliders.forEach((slider) => {
            slider.addEventListener("input", function (e){
                let min = e.target.getAttribute("min"),
                    max = e.target.getAttribute("max"),
                    val = e.target.value;

                e.target.style.backgroundSize = ((val - min) * 100 / (max - min) + `% 100%`);

                let calculatorInputs = document.querySelectorAll("[data-input-purpose]");

                let carPriceInput = calculatorInputs[0];
                let firstPaymentInput = calculatorInputs[1];
                let leasingTimeInput = calculatorInputs[2];

                let sliderId = slider.getAttribute("id");

                calculatorInputs.forEach(( input ) => {
                    input.addEventListener("change", function (){
                        let inputAtrr = input.getAttribute("data-input-purpose");

                        if( !(inputAtrr.match(/^(?:car-price|first-payment|leasing-time)$/) && input.value) ) {
                            return;
                        }

                        if( input.value < input.min ) {
                            input.value = input.min;
                        } else if( input.value > input.max ) {
                            input.value = input.max;
                        }
                    });
                });

                let percentField = document.querySelector(".calculator__percent-value");
                if (sliderId === "first-payment"){
                    percentField.value = val;
                }
                let percentValue = parseInt(percentField.value);
                let interestRate = 1.25;
                let carPriceValue = parseInt(carPriceInput.value);
                let leasingTimeValue = parseInt(leasingTimeInput.value);

                let firstPaymentCalc = ( percentValue / 100 ) * carPriceValue;
                let monthlyValue = Math.floor((( carPriceValue - firstPaymentCalc) * interestRate) / leasingTimeValue);

                let summaryValue = Math.floor(( firstPaymentCalc + leasingTimeValue * monthlyValue ));


                Calculator.handleOutputValue(summaryValue, monthlyValue);

                switch (true){
                    case sliderId === "car-price":
                        carPriceInput.value = val;
                        break;
                    case sliderId === "first-payment":
                        firstPaymentInput.value = Math.floor(firstPaymentCalc);
                        break;
                    case sliderId === "leasing-time":
                        leasingTimeInput.value = val;
                        break;
                }

            });
            slider.dispatchEvent(new Event("input"));
        });
    },

    handleOutputValue(summaryValue, monthlyValue){
        let calculatorOutputs = document.querySelectorAll("[data-calc-output]");

        calculatorOutputs.forEach((output) =>{
            let outputPurpose = output.getAttribute("data-calc-output");

            switch (true){
                case outputPurpose === "summary":
                    if (isNaN(summaryValue)){
                        summaryValue = 1125000;
                    }
                    output.innerHTML = `${summaryValue}` + " ₽";
                    break;
                case outputPurpose === "monthly-payment":
                    if (isNaN(monthlyValue)){
                        monthlyValue = 1125000;
                    }
                    output.innerHTML = `${monthlyValue}` + " ₽";
            }
        })
    }
}









