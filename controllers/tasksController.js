const createHttpError = require("http-errors");
const Task = require("../database/models/Task");
const errorResponse = require("../helpers/errorResponse");
const ObjetcId = require("mongoose").Types.ObjectId

module.exports = {
    list : async (req,res) => {
        try {
            const {project} = req.query;
            if(!ObjetcId.isValid(project)) throw createHttpError(404,"No es un ID valido");

            const tasks = await Task.find().where("project").equals(project).select("-createdAt -__v")

            return res.status(200).json({
                ok : true,
                msg :'Lista de Tareas',
                tasks
            })
        } catch (error) {
            return errorResponse(res, error, "TASKS-LIST")
        }
    },
    store : async (req,res) => {
        try {
            const {name, description, project} = req.body;
            if([name, description, project].includes("") || !name || !description || !project) throw createHttpError(400,"Todos los campos son obligatorios");

            if (!req.user) throw createHttpError(401,"Error de autenticacion");

            const task = new Task(req.body)
            task.createdBy = req.user._id;

            const taskStore = await task.save()

            return res.status(201).json({
                ok : true,
                msg :'Tarea guardada exitosamente',
                taskStore
            })
        } catch (error) {
            return errorResponse(res, error, "STORE-TASK")
        }
       
    },
    detail : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createHttpError(404,"No es un ID valido");

            const task = await Task.findById(id).select("-createdAt -__v")
            if (!task) throw createHttpError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== task.createdBy.toString()) throw createHttpError(401,"No estas autorizade");

            return res.status(200).json({
                ok : true,
                msg :'Detalle de la Tarea',
                task
            })
        } catch (error) {
            return errorResponse(res, error, "TASKS-DETAIL")
        }
       
    },
    update : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createHttpError(404,"No es un ID valido");

            const task = await Task.findById(id).select("-createdAt -__v")
            if (!task) throw createHttpError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== task.createdBy.toString()) throw createHttpError(401,"No estas autorizade");

            const {name, description, state, dateExpire, priority} = req.body;

            if (priority && !priority.includes("Baja") && !priority.includes("Media") && !priority.includes("Alta")) throw createHttpError(404,"No es una prioridad valida");

            task.name = name || task.name;
            task.description = description || task.description;
            task.state = state || task.state;
            task.dateExpire = dateExpire || task.dateExpire;
            task.priority = priority || task.priority;

            const taskUpdated = await task.save()

            return res.status(201).json({
                ok : true,
                msg :'Tarea actualizada',
                taskUpdated
            })
        } catch (error) {
            return errorResponse(res, error, "TASKS-UPDATE")
        }
    },
    remove : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createHttpError(404,"No es un ID valido");

            const task = await Task.findById(id).select("-createdAt -__v")
            if (!task) throw createHttpError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== task.createdBy.toString()) throw createHttpError(401,"No estas autorizade");

            await task.deleteOne()

            return res.status(200).json({
                ok : true,
                msg :'Tarea eliminada'
            })
        } catch (error) {
            return errorResponse(res, error, "TASKS-REMOVE")
        }
    },
    changeState : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjetcId.isValid(id)) throw createHttpError(404,"No es un ID valido");

            const task = await Task.findById(id).select("-createdAt -__v")
            if (!task) throw createHttpError(404,"Proyecto no encontrado");

            if (req.user._id.toString() !== task.createdBy.toString()) throw createHttpError(401,"No estas autorizade");

            task.state = !task.state

            await task.save()

            return res.status(200).json({
                ok : true,
                msg :'Tarea completada',
                task
            })
        } catch (error) {
            return errorResponse(res, error, "TASKS-CHANGE-STATE")
        }
    },
 
}