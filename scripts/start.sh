if [ "$0" != "./scripts/start.sh" ]; then
    echo "USE: npm start"
    exit 1
fi

if [ "$NODE_ENV" != "production" ]; then
    eslint .
fi

node index.js