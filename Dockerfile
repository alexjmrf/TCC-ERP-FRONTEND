# --- ESTÁGIO 1: Build da Aplicação Angular ---
# Usa a imagem oficial do Node.js como base. 'alpine' é uma versão leve.
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o contêiner
# Isso otimiza o cache do Docker, para que o 'npm install' só rode se as dependências mudarem.
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código-fonte da aplicação para o contêiner
COPY . .

# Executa o build de produção do Angular. O output irá para a pasta /app/dist/
RUN npm run build

# --- ESTÁGIO 2: Servir os Arquivos com Nginx ---
# Usa a imagem oficial e leve do Nginx como base para o contêiner final
FROM nginx:alpine

# Copia o nosso arquivo de configuração customizado para o Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos construídos no estágio 'build' para a pasta que o Nginx serve
# IMPORTANTE: Substitua 'tcc-frontend' abaixo pelo nome do seu projeto que aparece na pasta 'dist'
COPY --from=build /app/dist/front-tcc/browser /usr/share/nginx/html

# Expõe a porta 80, na qual o Nginx estará escutando
EXPOSE 80

# Comando para iniciar o Nginx em primeiro plano quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]