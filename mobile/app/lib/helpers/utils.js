
export function parseToken(token) {
    const jwtDecode = require('jwt-decode');
    return jwtDecode(token)
}


export function CategorizeGroup(sex, bodyFatPercent){
    if (sex == 'Male') {
        switch (true) {
            case (bodyFatPercent < 2):
                return 'Unacceptable'
            case (bodyFatPercent >= 2 && bodyFatPercent <= 4):
                return 'Essentail Fat';
            case (bodyFatPercent >= 6 && bodyFatPercent <= 13):
                return 'Athletes';
            case (bodyFatPercent >= 14 && bodyFatPercent <= 17):
                return 'Fitness';
            case (bodyFatPercent >= 17 && bodyFatPercent <= 25):
                return 'Acceptable';
            case (bodyFatPercent > 25):
                return 'Obese';
        }
    }
    else if (sex == 'Female') {
        switch (true) {
            case (bodyFatPercent < 10):
                return 'Unacceptable'
            case (bodyFatPercent >= 10 && bodyFatPercent <= 12):
                return 'Essentail Fat';
            case (bodyFatPercent >= 14 && bodyFatPercent <= 20):
                return 'Athletes';
            case (bodyFatPercent >= 21 && bodyFatPercent <= 24):
                return 'Fitness';
            case (bodyFatPercent >= 25 && bodyFatPercent <= 31):
                return 'Acceptable';
            case (bodyFatPercent > 31):
                return 'Obese';
        }

    }
    else {
        return 'Undefined'
    }
}

export function CalculateComposition(age, sex, weight, height, neck, waist, hips) {

    let bodyComposition = {
        category: '',
        percentBodyFat: 0,
        percentLeanMass: 0
    }

    let category, percentBodyFat, percentLeanMass

    if (weight > 0 && height > 0 && neck > 0 && waist > 0 && hips > 0) {
        if (sex == 'Male') {

            percentBodyFat = 495 / (1.0324 - 0.19077 * Math.log10(+waist - +neck) + 0.15456 * Math.log10(height)) - 450
        }
        else if (sex == 'Female') {
            percentBodyFat = 495 / (1.29579 - 0.35004 * Math.log10(+waist + +hips - +neck) + 0.22100 * Math.log10(height)) - 450
        }
    }

    if (percentBodyFat > 0) {
        bodyFatMass = ((weight * percentBodyFat) / 100)
        leanBodyMass = weight - bodyFatMass
        percentLeanMass = (leanBodyMass / weight) * 100

        category = CategorizeGroup(sex, percentBodyFat);
        console.warn(category);
        return bodyComposition =
            {
                category,
                percentBodyFat,
                percentLeanMass
            }

    }

    //Return if values are not met
    return bodyComposition
}