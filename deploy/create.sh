#!/bin/bash
set -e

# Move the root directory of this repo
pushd $(cd -P -- "$(dirname -- "$0")" && pwd -P)/.. 2>&1 >/dev/null
echo `pwd`

# Get the git sha to use as a tag
rev=$(git rev-parse HEAD | cut -c1-7)
echo "Deploying version $rev of site"

# Create the service
docker service create \
     --name fromlatest \
     --replicas 2 \
     --network replicated \
     --constraint "node.labels.publicip == ephemeral" \
     --with-registry-auth \
     quay.io/replicatedcom/fromlatest.io:$rev

# Return to the original directory
popd 2>&1 >/dev/null
