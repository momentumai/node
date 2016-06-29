if [ "$0" != "./scripts/install.sh" ]; then
    echo "USE npm install"
    exit 1
fi

if [ "$NODE_ENV" == "production" ]; then
    exit 0
fi

cd ./node_modules
ln -ns ../config "@config"
ln -ns ../../shared-node "@lib"
cd ../../shared-node
ln -ns ../frontent-api/node_modules node_modules
cd ..
