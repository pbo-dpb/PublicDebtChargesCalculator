# Calculateur des frais sur la dette publique

Cet outil est conçu de manière à fournir une estimation des coûts d'intérêt résultant des nouvelles propositions politiques et des mesures budgétaires.

Afin d'utiliser l'outil, il suffit de saisir les montants des recettes et des dépenses attendues de la proposition ou de la mesure. Les taux d'intérêt projetés par le DPB sont ensuite appliqués à la différence entre les revenus et les dépenses. Vous pourrez ainsi voir le surplus/déficit cumulatif incluant les frais d'intérêt sur la dette publique provenant d'une ou de plusieurs mesures. Les résultats sont reportés sur un horizon de 5 ans.

Par exemple, si une mesure est proposée et son coût est financé par la dette publique, alors des frais d'intérêt s'ajouteront au coût total de ladite mesure. De même, si une mesure est proposée et permet d'engranger de nouveaux revenus, alors ceux-ci permettront de réduire la dette publique et ainsi de réduire les frais d'intérêt payés sur celle-ci.

L'outil a été mis à jour afin de tenir compte des nouvelles projections des taux d'intérêt tirées de nos Perspectives économiques et financières (PEF).

[Version en ligne](https://www.pbo-dpb.ca/fr/research--recherches/tools--outils/public-debt-charges-calculator--calculateur-frais-dette-publique)

---

## Configuration du côté client

### Installation du projet
```
npm install
```

### Compilations et recharges à chaud pour le développement
```
npm run dev
```

### Compilation et miniaturisation pour la production
```
npm run build
```


## Configuration du côté serveur

### AWS Lambda

1. Créer une nouvelle couche avec les dépendances situées dans `server/requirements.txt`. La couche peut également être générée à l'aide d'une action GitHub (voir `.github/workflows/generate-lambda-layer.yml`).

2. Copier ./src/assets/payload.xlsx dans le répertoire ./server.

3. Zipper le contenu du répertoire ./server.

4. Créer une nouvelle fonction Lambda qui utilise la couche créée à l'étape 1 et le fichier zip créé à l'étape 3.

5. Définir la variable d'environnement `VITE_LAMBDA_FUNCTION_URL` sur l'URL de la fonction Lambda créée à l'étape 4.

## Déploiement

Une action GitHub est utilisée pour générer automatiquement les ressources du côté client et déployer la fonction Lambda. Cette action peut être déclenchée manuellement à la demande. Voir `.github/workflows/deploy.yml`.