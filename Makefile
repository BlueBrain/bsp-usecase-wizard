
TAG:=ebrains
IMAGE_FRONTEND:=wizard
REGISTRY:=antonelepfl


define HELPTEXT
Makefile usage
 Targets:
    run_dev        					Run development instance of the frontend.
    build_frontend_latest   Create the frontend project
    push_frontend_latest    Push the frontend image to dockerhub
endef
export HELPTEXT

help:
	@echo "$$HELPTEXT"


build_frontend_latest:
	@echo 'Building frontend...'
	@echo $(IMAGE_FRONTEND)
	cd frontend && docker build -t $(IMAGE_FRONTEND):$(TAG) .

push_frontend_latest: | build_frontend_latest
	docker tag $(IMAGE_FRONTEND):$(TAG) $(REGISTRY)/$(IMAGE_FRONTEND):$(TAG)
	docker push $(REGISTRY)/$(IMAGE_FRONTEND):$(TAG)

run_dev:
	npm run dev