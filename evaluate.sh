#!/bin/sh

# yes, it's ugly:
touch game.dat
rm game.dat

GAMES=100
time gogui/bin/gogui-twogtp -black "gogui/bin/gogui-dummy" -white "coffee engine.coffee" -size 9 -games $GAMES -sgffile game -auto -alternate -referee "$GNUGO_HOME/bin/gnugo --mode gtp" -threads 8

echo "Games out of $GAMES:"
cat game.dat | grep -v ^# | cut -f 4,5 | grep '\(^W.*1$\)\|\(^B.*0$\)' | wc -l