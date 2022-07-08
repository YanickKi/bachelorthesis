import matplotlib.pyplot as plt 
import numpy as np
from matplotlib import gridspec


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


fig = plt.figure()
# set height ratios for subplots
fig, axs = plt.subplots(4, 1, sharex=True, figsize =(8*1.62,8))
fig.subplots_adjust(hspace=0)

axs[0].plot(z, b)
xlim,ylim = axs[0].set_xlim(), axs[0].set_ylim()
axs[0].plot([xlim[0], 1, 1], [b[index_1A],  b[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.2, color = 'lightcoral')
axs[0].plot(z, b, color = 'darkseagreen')
axs[0].set_xlim(xlim)
axs[0].set_ylim(ylim)
axs[0].text(3, -0.37,r'a')
axs[0].set_ylabel(r"$b$")
axs[0].set_yticks([0, -0.1, -0.2, -0.3])

axs[1].plot(z, f)
xlim,ylim = axs[1].set_xlim(), axs[1].set_ylim()
axs[1].plot([xlim[0], 1, 1], [f[index_1A],  f[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.2, color = 'lightcoral')
axs[1].plot(z, f, color = 'darkseagreen')
axs[1].set_xlim(xlim)
axs[1].set_ylim(ylim)
axs[1].text(3, -0.08,r'b')
axs[1].set_ylabel(r"$f$")

axs[2].plot(z, h)
xlim,ylim = axs[2].set_xlim(), axs[2].set_ylim()
axs[2].plot([xlim[0], 1, 1], [h[index_1A],  h[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.2, color = 'lightcoral')
axs[2].plot(z, h, color = 'darkseagreen')
axs[2].set_xlim(xlim)
axs[2].set_ylim(ylim)
axs[2].text(3, -0.94,r'c')
axs[2].set_ylabel(r"$h$")
axs[2].set_yticks([0, -0.25, -0.5, -0.75, -1])

axs[3].plot(z, q)
xlim,ylim = axs[3].set_xlim(), axs[3].set_ylim()
axs[3].plot([xlim[0], 1, 1], [q[index_1A],  q[index_1A], ylim[0]] , linestyle = '--', linewidth = 1.2, color = 'lightcoral')
axs[3].plot(z, q, color = 'darkseagreen')
axs[3].set_xlim(xlim)
axs[3].set_ylim(ylim)
axs[3].set_xlabel(r"$z \mathbin{/} \si{\angstrom}$")
axs[3].text(3, -0.03,r'd')
axs[3].set_ylabel(r"$q$")

#plt.tight_layout(pad=0, h_pad=1.08, w_pad=1.08)
plt.savefig('../Plots/Faktoreninz_stacked.pdf', bbox_inches='tight')
