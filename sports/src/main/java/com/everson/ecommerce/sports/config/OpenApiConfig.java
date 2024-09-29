package com.everson.ecommerce.sports.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;



@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Everson",
                        email = "eversonmariano@yahoo.com.br",
                        url = "https://github.com/eversonmariano"
                ),
                description = "Documentação OpenApi para Spring Security ",
                title = "Especificações da OpenAPi API de uma Loja de Artigos Esportivos",
                version = "1.0.0",
                license = @License(
                        name = "@CreativeCommons",
                        url = "https://br.creativecommons.net/"
                ),
                termsOfService = "Terms Of Service"
        ),
        servers = {
                @Server(

                        description = "Local ENV",
                        url = "http://localhost:8081/swagger-ui/index.html"
                )

        },
        security = {
                @SecurityRequirement(
                        name = "Bearer"
                )
        }
)
@SecurityScheme(
        name = "Bearer",
        description = "JWT auth description",
        scheme = "Bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
