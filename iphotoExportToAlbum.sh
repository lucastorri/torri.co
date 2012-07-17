#!/bin/bash

cd $1
ALBUMS_DIR=`pwd`

for f in `ls -1`
do
	cd $ALBUMS_DIR/$f
	mv Images/* .
	rmdir Images
	mv Thumbnails thumbs
	rm -rf index.html Pages
	cd $ALBUMS_DIR
done