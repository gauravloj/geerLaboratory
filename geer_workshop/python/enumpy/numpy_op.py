import numpy as np
a = np.array([(1,2,3),(4,5,6)])

#prints dimension of array
print('dimension: ' + str(a.ndim))

#a = np.array([(1,'d',3),(4,'k',6)])
a = np.array([('d',1,'d'),('d',3,'d')])
#Returns size of each element in array
print('itemsize: ' + str(a.itemsize))


a = np.array([(1,2,3,4,5,6)])
#a = np.array([('d','d'),('d','d')])
#returns datatype of each element
print( a.dtype)

# prints sizer and shape of array
print('size: ' + str(a.size))
print('shape ' + str(a.shape))

#Reshaping 
print(a)
a=a.reshape(3,2)
print(a)

#Slicing
a=np.array([(1,2,3,4),(3,4,5,6)])
print(a[0,2])
print(a[0:,2])
# Sum of given row/axis
print(a.sum(axis=0))

a=np.array([(8,9),(10,11),(12,13)])
print(a[0:2,1])
print(a.min())
print(a.max())
print(a.sum())
print(np.sqrt(a))
print(np.std(a))


# Equally spaced numbers
a=np.linspace(1,3,10)
print(a)

