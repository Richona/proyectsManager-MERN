const createError = require("http-errors");
const Project = require("../database/models/Project");
const User = require("../database/models/User");
const errorResponse = require("../helpers/errorResponse");
const ObjetcId = require("mongoose").Types.ObjectId

module.exports = {
    list : async (req,res) => {
        try {
            const projects = await Project.find().where("createdBy").equals(req.user).select("name client")

            return res.status(200).json({
                ok : true,
                msg :'Lista de Proyectos',
                projects
            })
        } catch (error) {
            return errorResponse(res, error, "PROJECTS-LIST")
        }
       
    },
    store : async (req,res) => {
        try {
            const {name, description, client} = req.body;
            if([name, description, client].includes("") || !name || !description || !client) throw createError(400,"Todos los campos son obligatorios");

            if (!req.user) throw createError(401,"Error de autenticacion");

            const project = new Project(req.body)
            project.createdBy = req.user._id;

            const projectStore = await project.save()

            return res.status(201).json({
                ok : true,
                msg :'Proyecto guardado exitosamente',
                project: projectStore
            })
        } catch (error) {
            return errorResponse(res, error, "STORE-PROJECT")
        }
       
    },
    detail : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createError(404,"No es un ID valido");

            const project = await Project.findById(id).select("-createdAt")
            if (!project) throw createError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401,"No estas autorizade");

            return res.status(200).json({
                ok : true,
                msg :'Detalle del Proyecto',
                project
            })
        } catch (error) {
            return errorResponse(res, error, "PROJECT-DETAIL")
        }
       
    },
    update : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createError(404,"No es un ID valido");

            const project = await Project.findById(id)
            if (!project) throw createError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401,"No estas autorizade");

            const {name, description, client, dateExpire} = req.body;

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dateExpire = dateExpire || project.dateExpire;

            const projectUpdated = await project.save()

            return res.status(201).json({
                ok : true,
                msg :'Proyecto actualizado',
                project: projectUpdated
            })
        } catch (error) {
            return errorResponse(res, error, "PROJECT-UPDATE")
        }
    },
    remove : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createError(404,"No es un ID valido");

            const project = await Project.findById(id)
            if (!project) throw createError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401,"No estas autorizade");

            await project.deleteOne()
            
            return res.status(200).json({
                ok : true,
                msg :'Proyecto eliminado'
            })
        } catch (error) {
            return errorResponse(res, error, "PROJECT-REMOVE")
        }
    },
    addCollaborator : async (req,res) => {
        try {
            const {collaborators, idProject} = req.body;

            if([collaborators, idProject].includes("") || !collaborators || !idProject) throw createError(400,"Debes ingresar un colaborador");
            
            if(!ObjetcId.isValid(collaborators)) throw createError(404,"No es un ID valido | collaborator");
            if(!ObjetcId.isValid(idProject)) throw createError(404,"No es un ID valido | idProject");

            const project = await Project.findById(idProject)
            if (!project) throw createError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401,"No estas autorizade");

            if(req.user._id.toString() === collaborators.toString()) throw createError(401,"No puedes añadirte tu mismo");

            project.collaborators.forEach(collaborator => {
                if(collaborator.id.toString() === collaborators.toString()) throw createError(401,"El colaborador ya existe");
            })
            
            const userCollaborator = await User.findById(collaborators)

            const collaboratorNew = {
                id: collaborators,
                name: userCollaborator.name,
                email: userCollaborator.email
            }

            project.collaborators = [...project.collaborators, collaboratorNew];

            await project.save()

            return res.status(200).json({
                ok : true,
                msg :'Colaborador agregado',
                project
            })
        } catch (error) {
            return errorResponse(res, error, "COLLABORATOR-ADD")
        }
    },
    removeCollaborator : async (req,res) => {
        try {
            const {collaborators, idProject} = req.body;

            if([collaborators, idProject].includes("") || !collaborators || !idProject) throw createError(400,"Debes ingresar un colaborador");
            
            if(!ObjetcId.isValid(collaborators)) throw createError(404,"No es un ID valido | collaborator");
            if(!ObjetcId.isValid(idProject)) throw createError(404,"No es un ID valido | idProject");

            const project = await Project.findById(idProject)
            if (!project) throw createError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401,"No estas autorizade");

            const collaboratorExist = project.collaborators.find(collaborator => collaborator.id.toString() === collaborators.toString())
            if(!collaboratorExist) throw createError(404,"Colaborador no encontrado");

            project.collaborators = project.collaborators.filter(collaborator => collaborator.id.toString() !== collaborators.toString())

            await project.save()

            return res.status(200).json({
                ok : true,
                msg :'Colaborador eliminado',
                project
            })
        } catch (error) {
            return errorResponse(res, error, "COLLABORATOR-REMOVE")
        }
    },

}