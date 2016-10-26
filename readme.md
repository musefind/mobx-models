# Mobx Models

Opinionated framework for data fetching, form handling and general app
structure using MobX.

Mobx Models is a collection of tools that provide an overall opinionated
way to go about building MobX applications. At the same time, the developer
should find sufficient flexibility within the tooling to overcome situations
where the tools don't prescribe a specific solution.

## Goals

- Reduce boilerplate for things like loading flags and saving functions
- Only keep one copy of a model at a given time
- First class support for using and working with forms
- Opinionated structure

## Overview

MobX Models provides the following key pieces:

1. Stores: Keep only one copy of an object around.
2. Collection objects: Dynamically load data while ensuring that a new
    query does not load two copies of an object into memory.
3. Model: A model is the smallest piece of state, it has methods for
    saving and updating data.
4. ViewModel: Mutable object that limits side effects for models.

### Models

Models are simply javascript classes with a few helper methods.
