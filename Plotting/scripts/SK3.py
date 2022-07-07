import matplotlib.pyplot as plt 
import numpy as np

V_sigma = 1
V_pi = 1
a = 0.142e-9 
theta =  np.linspace(np.arctan(1e24), np.arctan(a/10e-10), 1000)


b = np.array(-np.sin(theta)**2*np.cos(theta)                       )
f = np.array(-np.cos(theta)**2*np.sin(theta)                       )
h = np.array(-np.sin(theta)*(1-2*np.cos(theta)**2)                 )
q = np.array(-np.cos(theta)**3+0.5*np.sin(theta)**2*np.cos(theta)  )


r  = np.array(a * np.sqrt(1+1/(np.tan(theta)**2)))


Exy = np.array(3/4*b * V_sigma - np.sqrt(3)/2 *b * V_pi    )
Exz = np.array(-np.sqrt(3)/2*f*V_sigma - 1/2 * h * V_pi     )
Ezy = np.array(-3/2*f*V_sigma - np.sqrt(3)/2 * h * V_pi      )
Ezsq = np.array(q*V_sigma + np.sqrt(3) * b * V_pi           )
Exsq = np.array(-np.sqrt(3)/4*b*V_sigma + 1/2 * b * V_pi    )

plt.figure(figsize = (10,5))
plt.xticks([0, 2, 4, 6, 8, 10])

r *= 1e9 # Distance in nm

plt.subplot(3, 2, 1)
plt.plot(r, Exy)
plt.title(r"$Exy3$")
plt.xlim(0,1)
plt.xlabel(r"r / nm")
plt.ylabel(r"J")
#plt.legend(r"Vsigma = 1, V_pi = 1")


plt.subplot(3, 2, 2)
plt.plot(r, Exz)
plt.title(r"$Exz3$")
plt.xlim(0,1)
plt.xlabel(r"r / nm")
plt.ylabel(r"J")
#plt.legend(r"Vsigma = 1, V_pi = 1")

plt.subplot(3, 2, 3)
plt.plot(r, Ezy)
plt.title(r"$Ezy3$")
plt.xlim(0,1)
plt.xlabel(r"r / nm")
plt.ylabel(r"J")
#plt.legend(r"Vsigma = 1, V_pi = 1")

plt.subplot(3, 2, 4)
plt.plot(r, Ezsq)
plt.title(r"$Ezsq3$")
plt.xlim(0,1)
plt.xlabel(r"r / nm")
plt.ylabel(r"J")
#plt.legend(r"Vsigma = 1, V_pi = 1")

plt.subplot(3, 2, 5)
plt.plot(r, Exsq)
plt.title(r"$Exsq3$")
plt.xlim(0,1)
plt.xlabel(r"r / nm")
plt.ylabel(r"J")
#plt.legend(r"Vsigma = 1, V_pi = 1")


plt.tight_layout(pad=0, h_pad=1.08, w_pad=1.08)
plt.savefig('../Plots/SK3.pdf')