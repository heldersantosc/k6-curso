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