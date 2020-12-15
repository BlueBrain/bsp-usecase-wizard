
TAG:=ebrains
IMAGE_FRONTEND:=wizard
REGISTRY:=antonelepfl


define HELPTEXT
Makefile usage
 Targets:
    run_dev        Run development instance of the frontend.
    build_latest   Create the frontend project
    push_latest    Push the frontend image to dockerhub
endef
export HELPTEXT

help:
	@echo "$$HELPTEXT"


build_latest:
	@echo 'Building frontend...'
	@echo $(IMAGE_FRONTEND)
	docker build -t $(IMAGE_FRONTEND):$(TAG) .

push_latest: | build_latest
	docker tag $(IMAGE_FRONTEND):$(TAG) $(REGISTRY)/$(IMAGE_FRONTEND):$(TAG)
	docker push $(REGISTRY)/$(IMAGE_FRONTEND):$(TAG)

run_dev:
	npm run dev