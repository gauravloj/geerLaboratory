from abc import ABC, abstractmethod     
 
class Employee(ABC):
    @abstractmethod
 
    def calculate_salary(self,sal):
        pass
 
class Developer(Employee):
 
    def calculate_salary(self,sal):
        finalsalary= sal*1.10
        return  finalsalary
 
emp_1 = Developer()
print(emp_1.calculate_salary(10000))