               static VALUE
string_to_r(VALUE self)
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

    (void)parse_rat(s, 0, &num);

    if (RB_TYPE_P(num, T_FLOAT))
        rb_raise(rb_eFloatDomainError, "Infinity");
    return num;
}