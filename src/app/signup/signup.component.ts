import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  signUp(e: Event): void {
    e.preventDefault();

    // Get input values from the form
    const fnameInput = document.getElementById('fname') as HTMLInputElement;
    const lnameInput = document.getElementById('lname') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const pwdInput = document.getElementById('pwd') as HTMLInputElement;

    const fname: string = fnameInput.value;
    const lname: string = lnameInput.value;
    const email: string = emailInput.value;
    const pwd: string = pwdInput.value;

    // Retrieve existing form data from localStorage or initialize an empty array
    let formData: Array<{ fname: string, lname: string, email: string, pwd: string, login: string }> = JSON.parse(localStorage.getItem('formData') || '[]');

    // Check if there is already an entry with the same email
    const exist: boolean = formData.some(data => data.email.toLowerCase() === email.toLowerCase());

    // If no duplicate email is found, add the new user to the form data
    if (!exist) {
        formData.push({ fname, lname, email, pwd, login: 'inactive' });
        localStorage.setItem('formData', JSON.stringify(formData));
        (document.querySelector('form') as HTMLFormElement).reset();
        fnameInput.focus();
        alert("Account Created.\n\nPlease Log In using the link below.");
    } else {
        alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
    }
}

}
