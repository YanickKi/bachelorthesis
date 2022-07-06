import matplotlib.pyplot as plt 
import numpy as np

V_sigma = 1
V_pi = 1
a = 0.142e-9 
theta =  np.linspace(np.arctan(1e24), np.arctan(a/10e-10), 1000)


b = np.sin(theta)**2*np.cos(theta)
f = np.cos(theta)**2*np.sin(theta)
h = np.sin(theta)*(1-2*np.cos(theta)**2)
q = np.cos(theta)**3-0.5*np.sin(theta)**2*np.cos(theta)


r  = a * np.sqrt(1+1/(np.tan(theta)**2))


#plt.subplot(4, 2, 1)
#plt.plot(theta, b)
#plt.title(r"$b$")
#
#plt.subplot(4, 2, 2)
#plt.plot(theta, f)
#plt.title(r"$f$")
#
#plt.subplot(4, 2, 3)
#plt.plot(theta, h)
#plt.title(r"$h$")
#
#plt.subplot(4, 2, 4)
#plt.plot(theta, q)
#plt.title(r"$q$")
#


plt.subplot(4, 2, 1)
plt.plot(r, b)
plt.title(r"$b$")

plt.subplot(4, 2, 2)
plt.plot(r, f)
plt.title(r"$f$")

plt.subplot(4, 2, 3)
plt.plot(r, h)
plt.title(r"$h$")

plt.subplot(4, 2, 4)
plt.plot(r, q)
plt.title(r"$q$")


plt.tight_layout(pad=0, h_pad=1.08, w_pad=1.08)
plt.savefig('build/figures/lattersintheta.pdf')