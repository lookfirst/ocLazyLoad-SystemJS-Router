#!/bin/bash

VERSION=$1

git tag v${VERSION}
git push origin v${VERSION}
npm publish
