@echo off
git add -A
set /p string=Give me your comment: 
git commit -m "%string%"
git push origin master
