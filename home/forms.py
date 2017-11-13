from django import forms


class ContactForm(forms.Form):
    contact_name = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Name'}))

    contact_email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': "form-control", 'placeholder': 'Your Email'}))

    subject = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Subject'})
    )

    message = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Message'})
    )