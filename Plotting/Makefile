all: build/main.pdf

# hier Python-Skripte:
#build/plot.pdf: plot.py matplotlibrc header-matplotlib.tex | build
#	TEXINPUTS=$$(pwd): python plot.py

../Plots/SK1.pdf: scripts/SK1.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/SK1.py

../Plots/SK2pdf: scripts/SK2.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/SK2.py

../Plots/SK3.pdf: scripts/SK3.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/SK3.py

../Plots/Faktoreninr.pdf: scripts/qinr.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/qinr.py

../Plots/Faktorenintheta.pdf: scripts/qintheta.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/qintheta.py
	
../Plots/Faktoreninz.pdf: scripts/qinz.py matplotlibrc header-matplotlib.tex | build
	TEXINPUTS=$$(pwd): python scripts/qinz.py

# hier weitere Abhängigkeiten für build/main.pdf deklarieren:
build/main.pdf: ../Plots/SK1.pdf ../Plots/SK2.pdf ../Plots/SK3.pdf ../Plots/Faktoreninr.pdf ../Plots/Faktorenintheta.pdf ../Plots/Faktoreninz.pdf

build/main.pdf: FORCE | build
	  TEXINPUTS=build: \
	  BIBINPUTS=build: \
	  max_print_line=1048576 \
	latexmk \
	  --lualatex \
	  --output-directory=build \
	  --interaction=nonstopmode \
	  --halt-on-error \
	main.tex

build:
	mkdir -p build

clean:
	rm -rf build

FORCE:

.PHONY: all clean
