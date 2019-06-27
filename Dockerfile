 
FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build-env
WORKDIR /app 

COPY HOI/*.csproj ./
RUN dotnet restore
 
COPY . ./
RUN dotnet publish -c Release -o out
 
WORKDIR /app
COPY --from=build-env /app/out .
CMD dotnet HOI.dll