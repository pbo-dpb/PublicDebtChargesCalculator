# Public Debt Charges Calculator

This tool is designed to provide an estimate of the interest costs resulting from new policy proposals and budgetary measures.

To use the tool, simply enter the revenue and expense amounts that are expected from the proposal or measure. The PBO's projected interest rates are then applied to the difference between the revenues and expenses. This will show you the cumulative surplus/deficit including the interest costs on public debt from one or more measures. The results are reported over a 5-year horizon.

For example, if a measure is proposed and its cost is financed by public debt, then interest charges will be added to the total cost of that measure. Similarly, if a measure is proposed and generates new revenues, then these revenues will reduce the public debt and thus reduce the interest costs paid on it.

The tool has been updated to reflect the new interest rate projections from our October Economic and Fiscal Outlook (EFO).

[Live version](https://www.pbo-dpb.ca/en/research--recherches/tools--outils/public-debt-charges-calculator--calculateur-frais-dette-publique)

---

## Frontend setup

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Backend setup

### AWS Lambda

1. Create a new layer with the dependencies located in `server/requirements.txt`. The layer can also be generated using a GitHub Action (see `.github/workflows/generate-lambda-layer.yml`).

2. Copy ./src/assets/payload.xlsx into the ./server directory.

3. Zip the contents of the ./server directory.

4. Create a new Lambda function that uses the layer created in step 1 and the zip file created in step 3.

5. Set the `VITE_LAMBDA_FUNCTION_URL` environment variable to the URL of the Lambda function created in step 4.

## Deployment

A GitHub action is used to automatically generate the frontend assets and deploy the Lambda function. This action can be triggered manually on demand. See `.github/workflows/deploy.yml`.
