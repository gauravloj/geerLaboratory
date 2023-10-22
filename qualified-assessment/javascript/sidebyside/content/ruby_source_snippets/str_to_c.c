               static VALUE
string_to_c(VALUE self)
{
    char *s;
    VALUE num;

    rb_must_asciicompat(self);

    s = RSTRING_PTR(self);

    if (s && s[RSTRING_LEN(self)]) {
        rb_str_modify(self);
        s = RSTRING_PTR(self);
        s[RSTRING_LEN(self)] = '\0';
    }

    if (!s)
        s = (char *)"";

    (void)parse_comp(s, 0, &num);

    return num;
}