comando para exportar resultados em csv:

```
 k6 run -o csv=resultado.csv groups.js
```

comando para definir variáveis de ambiente

```
k6 run -e BASE_URL=http://test.k6.io/ environments.js
```

comando para definir variáveis de ambiente

```
k6 run -e BASE_URL=http://test.k6.io/ environments.js --stage 5s:5,5s:5,5s:0
```

api pública do k6 para testes

```
https://test-api.k6.io/
```

comando para executar o exemplo 6

```
k6 run exemplo6.js -e URL=https://test-api.k6.io/public
```

comando para desfazer último commit

```
git reset --soft HEAD~
```

comando para visualização de dashboard e exportação de report
```
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run exemplo2.js
```