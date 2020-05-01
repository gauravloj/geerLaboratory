class anotherEmployee:
    perc_raise =1.05
    num_employee=0
    def __init__(self, first, last, sal):
        self.fname=first
        self.lname=last
        self.sal=sal
        self.email=first + '.' + last + '@company.com'
        anotherEmployee.num_employee+=1
    def fullname(self):
        return '{}{}'.format(self.fname,self.lname)

    def apply_raise(self):
        self.sal=int(self.sal* self.perc_raise)


#Inheritance 
class developer(anotherEmployee):
    perc_raise = 1.10
    def __init__(self, first, last, sal, prog_lang):
        super().__init__(first, last, sal)
        self.prog_lang=prog_lang

class employee():
    pass
#no attributes and methods
 
emp_1=developer('aayushi','johari',350000,'python')
emp_2=developer('test','test',100000,'pythonn')
print(emp_1.email)
print(emp_2.email)
print(emp_1.fullname())
print(emp_2.fullname())
print(emp_1.sal)
emp_1.apply_raise()
print(emp_1.sal)
print(emp_1.__dict__)
print(emp_1.num_employee)
print('')


# Dynamic modification of class attributes
emp_1=employee()
emp_2=employee()
 #instance variable can be created manually
emp_1.first='aayushi'
emp_1.last='Johari'
emp_1.ahoy = 'nohoy'
emp_1.email='aayushi@edureka.co'
emp_1.pay=10000
 
emp_2.first='test'
emp_2.last='abc'
emp_2.email='test@company.com'
emp_2.pay=10000
print(emp_1.email)
print(emp_1.ahoy)
print(emp_2.email)

