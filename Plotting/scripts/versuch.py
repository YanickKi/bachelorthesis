import numpy as np 
import matplotlib.pyplot as plt 

#ALLES IN SI 

a = 0.142e-9 


z = np.linspace(1e-100,3e-10, 50)
theta =np.array(np.arctan(a/z))
r = a/np.sin(theta)
t = -2.74*1.602e-19
z_plot = 1 +1j

V_sigma0 = 1.602e-19
V_sigma1 = 1.602e-20
V_pi0    = 1.602e-20
V_pi1    = 1.602e-21
r0      = a
r1      = np.sqrt(a**2+ (3-10)**2)

V_sigma = V_sigma0 * np.exp(np.log(V_sigma0/V_sigma1) * r0/(r1-r0)) *  np.exp(np.log(V_sigma0/V_sigma1)/(r1-r0)*r)
V_pi = V_pi0 * np.exp(np.log(V_pi0/V_pi1) * r0/(r1-r0)) *  np.exp(np.log(V_pi0/V_pi1)/(r1-r0)*r)

b = -np.sin(theta)**2*np.cos(theta)
f = -np.cos(theta)**2*np.sin(theta)
h = -np.sin(theta)*(1-2*np.cos(theta)**2)
q = -np.cos(theta)**3+0.5*np.sin(theta)**2*np.cos(theta)

gamma40 = np.sqrt(3) * q * V_sigma + 3*b*V_pi 


#gamma = np.array(   [np.srqt(2/3)*(np.sqrt(3)*3/4*b*V_sigma-3/2*b*V_pi)
#                    ,np.srqt(2/3)*(np.sqrt(3)*3/4*b*V_sigma-3/2*b*V_pi)
#                    ,np.srqt(2/3)*(np.sqrt(3)*3/2*f*V_sigma+3/2*h*V_pi)
#                    ,np.srqt(2/3)*(np.sqrt(3)*3/2*f*V_sigma+3/2*h*V_pi)
#                    ,np.srqt(2/3)*(3/np.sqrt(2)*q*V_sigma+np.sqrt(3/2)*3*b*V_pi)]
#

gamma01 = 3/np.sqrt(8)*b*V_sigma+np.sqrt(3)/np.sqrt(2)*b*V_pi

sum_all = 0


##############BEREICH1####################

k11 = np.linspace(-2*np.pi/(3*a), 2*np.pi/(3*a), 100)
k21 = np.linspace(-2*np.pi/(3*np.sqrt(3)*a), 2*np.pi/(3*np.sqrt(3)*a), 100)

def hybrid1(k1, k2):
        sum = 0
        for n in range(k1.size):
                    for i in range(k2.size):
                        sum = sum + (3 + 2 * np.cos(np.sqrt(3)*a*k2[i])+2*np.cos(3/2*k1[n]+np.sqrt(3)/2*a*k2[i])+2*np.cos(3/2*k1[n]-np.sqrt(3)/2*a*k2[i]))/(z_plot**2- t**2*(3 + 2 * np.cos(np.sqrt(3)*a*k2[i])+2*np.cos(3/2*k1[n]+np.sqrt(3)/2*a*k2[i])+2*np.cos(3/2*k1[n]-np.sqrt(3)/2*a*k2[i])))
                        print(sum)
        return sum

sum_all = np.real(hybrid1(k11, k21)) * z_plot/(k11.size*k21.size)


##############BEREICH2####################

#k12 = np.linspace(-2*np.pi/(3*a), 2*np.pi/(3*a), 100)
#k22 = np.linspace(-2*np.pi/(3*np.sqrt(3)*a), 2*np.pi/(3*np.sqrt(3)*a), 100)
#
#def hybrid1(k1, k2):
#        sum = 0
#        for n in range(k1.size):
#                    for i in range(k2.size):
#                        sum = sum + (3 + 2 * np.cos(np.sqrt(3)*a*k2[i])+2*np.cos(3/2*k1[n]+np.sqrt(3)/2*a*k2[i])+2*np.cos(3/2*k1[n]-np.sqrt(3)/2*a*k2[i]))/(z_plot**2- t**2*(3 + 2 * np.cos(np.sqrt(3)*a*k2[i])+2*np.cos(3/2*k1[n]+np.sqrt(3)/2*a*k2[i])+2*np.cos(3/2*k1[n]-np.sqrt(3)/2*a*k2[i])))
#                        print(sum)
#        return sum
#
#sum_all = hybrid1(k11, k22) * z_plot/(k11.size*k22.size)










plt.plot(r, gamma40**2 * sum_all)
plt.savefig('../Plots/versuch.pdf')