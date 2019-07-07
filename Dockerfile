FROM busybox AS build-env
WORKDIR /app
RUN mkdir -p out && echo foo > out/CostsAnalyse.dll


WORKDIR /app
COPY --from=build-env /app/out/ .