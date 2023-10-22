memo = {}
en=[]
def do(n,e,k):
    print(n, k, e)
    if n==0:
        en.append(e)
    else:
        for i in range(n,0,-1):
            if i<=k:
                do(n-i,e+[i],i)
        # print("nothing")
do(10,[],10)
# print(en)