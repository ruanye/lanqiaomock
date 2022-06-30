#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
git add -A
echo '条件开始'
sleep 5
git commit -m $1
echo '自动发布'
sleep 5
git push origin master
echo '自动发布完成'
