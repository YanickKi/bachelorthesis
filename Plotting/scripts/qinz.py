import matplotlib.pyplot as plt 
import numpy as np

V_sigma = 1
V_pi = 1
a = 0.142e-9 


z = np.linspace(1e-100, 3e-10, 1000)

theta =  np.array(np.arctan(a/z))


b = -np.sin(theta)**2*np.cos(theta)
f = -np.cos(theta)**2*np.sin(theta)
h = -np.sin(theta)*(1-2*np.cos(theta)**2)
q = -np.cos(theta)**3+0.5*np.sin(theta)**2*np.cos(theta)

z *= 1e10

index_1A = np.where(z == 1)

plt.figure(figsize = (1.61*8,8.9))

plt.subplot(4, 2, 1)
plt.plot(z, b)
xlim,ylim = plt.xlim(), plt.ylim()
plt.plot([xlim[0], 1, 1], [b[index_1A],  b[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.4, color = 'lightcoral')
plt.plot(z, b, color = 'darkseagreen')
plt.xlim(xlim)
plt.ylim(ylim)
plt.xlabel(r"$z \mathbin{/} \si{\angstrom}$")
plt.text(2.887, -0.083,r'(a)')
plt.xticks(fontsize = 14) 
plt.yticks(fontsize = 14) 
plt.ylabel(r"$b$")



plt.subplot(4, 2, 2)
plt.plot(z, f)
xlim,ylim = plt.xlim(), plt.ylim()
plt.plot([xlim[0], 1, 1], [f[index_1A],  f[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.4, color = 'lightcoral')
plt.plot(z, f, color = 'darkseagreen')
plt.xlim(xlim)
plt.ylim(ylim) 
plt.xlabel(r"$z \mathbin{/} \si{\angstrom}$")
plt.text(2.88, -0.083,r'(b)')
plt.xticks(fontsize = 14) 
plt.yticks(fontsize = 14) 
plt.ylabel(r"$f$")

plt.subplot(4, 2, 3)
plt.plot(z, h)
xlim,ylim = plt.xlim(), plt.ylim()
plt.plot([xlim[0], 1, 1], [h[index_1A],  h[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.4, color = 'lightcoral')
plt.plot(z, h, color = 'darkseagreen')
plt.xlim(xlim)
plt.ylim(ylim)
plt.xlabel(r"$z \mathbin{/} \si{\angstrom}$")
plt.text(2.889, -0.15,r'(c)')
plt.xticks(fontsize = 14) 
plt.yticks(fontsize = 14) 
plt.ylabel(r"$h$")

plt.subplot(4, 2, 4)
plt.plot(z, q)
xlim,ylim = plt.xlim(), plt.ylim()
plt.plot([xlim[0], 1, 1], [q[index_1A],  q[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.4, color = 'lightcoral')
plt.plot(z, q, color = 'darkseagreen')
plt.xlim(xlim)
plt.ylim(ylim)
plt.xlabel(r"$z \mathbin{/} \si{\angstrom}$")
plt.text(2.88, -0.037,r'(d)')
plt.xticks(fontsize = 14) 
plt.yticks(fontsize = 14) 
plt.ylabel(r"$q$")


plt.tight_layout(pad=0, h_pad=1.08, w_pad=1.08)
plt.savefig('../Plots/Faktoreninz.pdf', bbox_inches='tight')
