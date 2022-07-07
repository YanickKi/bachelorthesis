import numpy as np 

#ALLES IN SI 

V_sigma = 1
V_pi = 1
a = 0.142e-9 

delta = np.array([a, 0)], [-a/2, a*np.sqrt(3)/2], [-a/2, -a*np.sqrt(3)/2])

kroneck = np.arry([0, 0, 0, 0, 1])

b = np.sin(theta)**2*np.cos(theta)
f = np.cos(theta)**2*np.sin(theta)
h = np.sin(theta)(1-2*np.cos(theta)**2)
q = np.cos(theta)**3-0.5*np.sin(theta)**2*np.cos(theta)

gamma = np.array(   [np.srqt(2/3)*(np.sqrt(3)*3/4*b*V_sigma-3/2*b*V_pi)
                    ,np.srqt(2/3)*(np.sqrt(3)*3/4*b*V_sigma-3/2*b*V_pi)
                    ,np.srqt(2/3)*(np.sqrt(3)*3/2*f*V_sigma+3/2*h*V_pi)
                    ,np.srqt(2/3)*(np.sqrt(3)*3/2*f*V_sigma+3/2*h*V_pi)
                    ,np.srqt(2/3)*(3/np.sqrt(2)*q*V_sigma+np.sqrt(3/2)*3*b*V_pi)]


sum = 0

def hybrid(gamma, k1, k2, m, n):
    for i in range(2):
        for n in range(k1.size):
            sum = sum + gamma[m]*np.exp((k1[n]*delta[i, 0] + k2[n]*delta[i,1])*1j+(-1)**m*(2/3*(i-1)*np.pi*1j)*(1-kroneck[m]))



