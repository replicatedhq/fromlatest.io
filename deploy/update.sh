#!/bin/bash
set -e

# Move the root directory of this repo
pushd $(cd -P -- "$(dirname -- "$0")" && pwd -P)/.. 2>&1 >/dev/null

# Get the git sha to use as a tag
rev=$(git rev-parse HEAD | cut -c1-7)
echo "Deploying version $rev of site"

docker service update \
     --replicas 2 \
     --with-registry-auth \
     --image quay.io/replicatedcom/fromlatest.io:$rev \
     fromlatest

# Return to the original directory
popd 2>&1 >/dev/null
