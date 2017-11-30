const doc = document;
const forms = doc.getElementById('card-details');

forms.addEventListener('submit', validator);

const rules = {
    required: function(el) {
        if(el.value != '') {
            return true;
        }
        return false;
    },
    number: function(el) {
        const reg = /^\d{4}$/;
        return reg.test(el.value);
    },
    user: function(el) {
        const reg = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;
        return reg.test(el.value);
    },
    code: function(el) {
        const reg = /^\d{3}$/;
        return reg.test(el.value);
    }
};

function showErrors(arr) {
    for(let i = 0; i<arr.length; i++) {
        const el = doc.getElementsByName(arr[i].name);
        for(let j = 0; j<el.length; j++) {
            el[j].style.border = '1px solid red';
        }
    }
    console.log(arr); // eslint-disable-line
}

function validator(e) {
    // e.preventDefault();
    const errors = [];
    const inputs = this.elements;
    for(let i = 0; i < inputs.length; i++) {
        if (inputs[i].tagName != 'BUTTON') {
            let rulesList = inputs[i].dataset.ruls;
            rulesList = rulesList.split(' ');
            for(let j = 0; j < rulesList.length; j++) {
                if (rulesList[j] in rules) {
                    if(!rules[rulesList[j]](inputs[i])) {
                        errors.push({
                            name: inputs[i].name,
                            error: rulesList[j]
                        });
                    }
                }
            }
        }
    }
    if(errors.length > 0) {
        e.preventDefault();
        showErrors(errors);
    }
    else {
        alert('confirm');
    }
}
