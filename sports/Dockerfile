# Build stage
FROM maven:3.9-eclipse-temurin-22-alpine AS build
WORKDIR /build

# Copiar o pom.xml e baixar as dependências
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar o código-fonte
COPY src ./src

# Compilar e empacotar a aplicação
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:22-alpine

# Argumento para definir a versão do JAR
ARG APP_VERSION=0.0.1-SNAPSHOT

# Diretório de trabalho no contêiner
WORKDIR /app

# Copiar o JAR da fase de build
COPY --from=build /build/target/sports-${APP_VERSION}.jar /app/sports.jar

# Expor a porta 8081, conforme o seu application.yml
EXPOSE 8081

# Definir variáveis de ambiente para o banco de dados e Redis
ENV DB_URL=jdbc:mysql://sportscenter-mysql:3306/sports-center
ENV REDIS_URL=redis://sportscenter-redis:6379

# Comando de execução
CMD ["java", "-XX:+EnableDynamicAgentLoading", "-jar", "-Dspring.datasource.url=${DB_URL}", "-Dspring.redis.host=${REDIS_URL}", "/app/sports.jar"]

