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


Exy = np.array(0 * b                               )
Exz = np.array(np.sqrt(3)*f*V_sigma + h * V_pi     )
Ezy = np.array(0 * b                               )
Ezsq = np.array(q*V_sigma + np.sqrt(3) * b *  V_pi       )
Exsq = np.array(np.sqrt(3)/2*b*V_sigma - b * V_pi   )

plt.figure(figsize = (10,5))


r *= 1e9 # Distance in nm

plt.subplot(3, 2, 1)
plt.plot(r, Exy)
plt.xlim(0,1)
plt.xlabel(r"$|\vec{d}| \mathbin{/} \si{\nano\meter}$")
plt.ylabel(r"$E_{z,xy} \mathbin{/} \si{\joule}$")
plt.legend(r"$V_{\sigma} = 1, V_{\pi} = 1$")


plt.subplot(3, 2, 2)
plt.plot(r, Exz)
plt.title(r"$Exz1$")
plt.xlim(0,1)
#plt.xlabel(r"$|\vec{d}| \mathbin{/} \si{\nano\meter}$")
plt.ylabel(r"$E_{z,xz} \mathbin{/} \si{\joule}$")
#plt.legend(r"V_sigma = 1, V_pi = 1")

plt.subplot(3, 2, 3)
plt.plot(r, Ezy)
plt.title(r"$Ezy1$")
plt.xlim(0,1)
#plt.xlabel(r"$|\vec{d}| \mathbin{/} \si{\nano\meter}$")
plt.ylabel(r"$E_{z,zy} \mathbin{/} \si{\joule}$")
#plt.legend(r"V_sigma = 1, V_pi = 1")

plt.subplot(3, 2, 4)
plt.plot(r, Ezsq)
plt.title(r"$Ezsq1$")
plt.xlim(0,1)
#plt.xlabel(r"$|\vec{d}| \mathbin{/} \si{\nano\meter}$")
plt.ylabel(r"$E_{z,3z^2-r^2} \mathbin{/} \si{\joule}$")
#plt.legend(r"V_sigma = 1, V_pi = 1")

plt.subplot(3, 2, 5)
plt.plot(r, Exsq)
plt.title(r"$Exsq1$")
plt.xlim(0,1)
#plt.xlabel(r"$|\vec{d}| \mathbin{/} \si{\nano\meter}$")
plt.ylabel(r"$E_{z,x^2-y^2} \mathbin{/} \si{\joule}$")
#plt.legend(r"V_sigma = 1, V_pi = 1")

plt.legend()
plt.tight_layout(pad=0, h_pad=1.08, w_pad=1.08)
plt.savefig('../Plots/SK1.pdf')