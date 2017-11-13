from django.shortcuts import render
from .forms import ContactForm
from .models import PortfolioItem, PortfolioCategory, Acknowledgements
from django.shortcuts import redirect
from django.core.mail import send_mail


def index(request):
    portfolio_items = PortfolioItem.objects.all().order_by('order')
    portfolio_categories = PortfolioCategory.objects.all()
    form_class = ContactForm

    # new logic
    if request.method == 'POST':
        form = form_class(data=request.POST)

        if form.is_valid():
            contact_name = request.POST.get('contact_name', '')
            contact_email = request.POST.get('contact_email', '')
            subject = request.POST.get('subject', '')
            message = request.POST.get('message', '')

            send_mail(
                'Ebonsignori.com New Message: ' + str(subject),
                'Name:' + str(contact_name) + '\n\nEmail: ' + str(contact_email) + '\n\nContents:\n\n\n' + message,
                'evan@ebonsignori.com',
                ['evanabonsignori@gmail.com'],
                fail_silently=False,
            )

            was_sent = True

            return render(request, 'home/home.html', {'form': form, 'was_sent': was_sent})

    return render(request, 'home/home.html', {'form': form_class,
                                              'portfolio_items': portfolio_items,
                                              'portfolio_categories': portfolio_categories})


def acknowledgements(request):
    acknowledgements = Acknowledgements.objects.all()
    return render(request, 'home/acknowledgements.html', {'acknowledgements': acknowledgements})