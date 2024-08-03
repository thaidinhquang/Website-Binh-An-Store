
# setup 
docker pull stripe/stripe-cli

# stripe login
docker run --rm -e STRIPE_API_KEY=sk_test_51PUWPDJ9Y0p2nVVHYUuFXlTlp48iIfXfzte8xqhH440XzvHGpLGfCt3kx7X63u8HcuUJ1R6dzcKyUSfbmHcouaSl00lfScmz92 stripe/stripe-cli login
    
# docker run --network="host" --rm -it --env-file .webhook_env stripe/stripe-cli listen -p 5000:5000 --forward-to http://host.docker.internal:5000/webhook  --skip-verify --api-key $STRIPE_API_KEY
docker run --rm -it stripe/stripe-cli -p 8000:8000  listen --forward-to http://host.docker.internal:8000/webhook --skip-verify --api-key sk_test_51PUWPDJ9Y0p2nVVHYUuFXlTlp48iIfXfzte8xqhH440XzvHGpLGfCt3kx7X63u8HcuUJ1R6dzcKyUSfbmHcouaSl00lfScmz92

# Forward events to your webhood
docker run --rm --env-file .env stripe/stripe-cli trigger payment_intent.succeeded
