from django import template
register = template.Library()


@register.filter(name='addclass')
def addclass(field, css):
    return field.as_widget(attrs={"class":css})


@register.filter(name='addid')
def addid(field, css):
    return field.as_widget(attrs={"id":css})


@register.filter(name='addplaceholder')
def addplaceholder(field, css):
    return field.as_widget(attrs={"placeholder":css})
