"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, MatchTrip, Trip
from api.utils import generate_sitemap, APIException
import cloudinary
import cloudinary.uploader
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from datetime import date

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login_user():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    if body_email and body_password:
        user = User.query.filter_by(email=body_email).filter_by(
            password=body_password).first()
        if user:
            # identity es un parametro de la libreria de token JWT. Aca dentro de todo el token se encuentra el parametro que yo desee. EN este caso, user.id
            token = create_access_token(identity=user.id)
            return jsonify({"logged": True, "token": token, "user": user.serialize()}), 200
        else:
            return jsonify({"logged": False, "msg": "Bad info"}), 400
    else:
        return jsonify({"logged": False, "msg": "Missing info"}), 400


@api.route("/register", methods=["POST"])
def register_user():
    body_username = request.json.get("username")
    body_firstname = request.json.get("firstname")
    body_lastname = request.json.get("lastname")
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    body_city_of_residence = request.json.get("city_of_residence")

    if body_email and body_password:
        new_user = User(username=body_username, firstname=body_firstname, lastname=body_lastname,
                        email=body_email, password=body_password, city_of_residence=body_city_of_residence)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"created": True, "user": new_user.serialize()}), 200
    else:
        return jsonify({"created": False, "msg": "Falta información"}), 400


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        return jsonify({"logged_in": True, "user_id": current_id}), 200
    else:
        return jsonify({"logged_in": False, "prueba": "prueba"}), 401

@api.route("/user", methods=["GET"])
@jwt_required()
def getUser():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        return jsonify({"user": user.serialize()}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 400

@api.route("/profile/<int:id>", methods=["GET"])
@jwt_required()
def getProfile(id):
    current_id = get_jwt_identity()
    current_user = User.query.get(current_id)
    if current_user:
        user = User.query.get(id)
        return jsonify({"user": user.serialize()}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 400

# EDIT USER

@api.route("/user", methods=["PUT"])
@jwt_required()
def editUser():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_username = request.form.get("username", None)
    if body_username == "" or body_username == None:
        body_username = "Username"
    body_firstname = request.form.get("firstname", None)
    if body_firstname == "" or body_firstname == None:
        body_firstname = "First Name"
    body_lastname = request.form.get("lastname", None)
    if body_lastname == "" or body_lastname == None:
        body_lastname = "Last Name"
    body_city_of_residence = request.form.get("city_of_residence", None)
    if body_city_of_residence == "" or body_city_of_residence == None:
        body_city_of_residence = "City"
    body_description = request.form.get("description", None)
    if body_description == "" or body_description == None:
        body_description = ""
    body_country = request.form.get("country", None)
    if body_country == "" or body_country == None:
        body_country = "Country"
    if "banner_picture" in request.files:
        body_banner_picture = cloudinary.uploader.upload(
            request.files['banner_picture'])
        user.banner_picture = body_banner_picture['secure_url']
    if "profile_picture" in request.files:
        body_profile_picture = cloudinary.uploader.upload(
            request.files['profile_picture'])
        user.profile_picture = body_profile_picture['secure_url']
    user.username = body_username
    user.firstname = body_firstname
    user.lastname = body_lastname
    user.city_of_residence = body_city_of_residence
    user.description = body_description
    user.country = body_country
    db.session.commit()
    return jsonify({"edited": True, "user": user.serialize()}), 200

# TRIP

@api.route("/trip/<int:trip_id>", methods=["GET"])
@jwt_required()
def trip(trip_id):
    trip = Trip.query.get(trip_id)
    if trip:
        return jsonify({"trip": trip.serialize()}), 200
    else:
        return jsonify({"error": "no trip"}), 400

# EDIT A TRIP

@api.route("/trip", methods=["PUT"])
@jwt_required()
def editTrip():
    current_id = get_jwt_identity()
    body_trip_id = request.form.get("id")
    trip = Trip.query.get(body_trip_id)
    body_destination = request.form.get("destination", None)
    if body_destination == "" or body_destination == None:
        body_destination = "Destination"
    body_start_of_the_trip = request.form.get("start_of_the_trip", None)
    if body_start_of_the_trip == "" or body_start_of_the_trip == None:
        body_start_of_the_trip = "Start"
    body_end_of_the_trip = request.form.get("end_of_the_trip", None)
    if body_end_of_the_trip == "" or body_end_of_the_trip == None:
        body_end_of_the_trip = "End"
    body_people = request.form.get("people", None)
    if body_people == "" or body_people == None:
        body_people = "0"
    body_transport = request.form.get("transport", None)
    if body_transport == "" or body_transport == None:
        body_transport = "None"
    body_cost = request.form.get("cost", None)
    if body_cost == "" or body_cost == None:
        body_cost = "0"
    body_text = request.form.get("text", None)
    if body_text == "" or body_text == None:
        body_text = ""
    body_imagen_1 = request.form.get("imagen_1", None)
    if body_imagen_1 == "" or body_imagen_1 == None:
        body_imagen_1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    body_imagen_2 = request.form.get("imagen_2", None)
    if body_imagen_2 == "" or body_imagen_2 == None:
        body_imagen_2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    body_imagen_3 = request.form.get("imagen_3", None)
    if body_imagen_3 == "" or body_imagen_3 == None:
        body_imagen_3 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    body_imagen_4 = request.form.get("imagen_4", None)
    if body_imagen_4 == "" or body_imagen_4 == None:
        body_imagen_4 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    body_imagen_5 = request.form.get("imagen_5", None)
    if body_imagen_5 == "" or body_imagen_5 == None:
        body_imagen_5 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    body_imagen_6 = request.form.get("imagen_6", None)
    if body_imagen_6 == "" or body_imagen_6 == None:
        body_imagen_6 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    if "destination_picture" in request.files:
        body_destination_picture = cloudinary.uploader.upload(
            request.files['destination_picture'])
        trip.destination_picture = body_destination_picture['secure_url']
    if "imagen_1" in request.files:
        body_imagen_1 = cloudinary.uploader.upload(
            request.files['imagen_1'])
        trip.imagen_1 = body_imagen_1['secure_url']
    if "imagen_2" in request.files:
        body_imagen_2 = cloudinary.uploader.upload(
            request.files['imagen_2'])
        trip.imagen_2 = body_imagen_2['secure_url']
    if "imagen_3" in request.files:
        body_imagen_3 = cloudinary.uploader.upload(
            request.files['imagen_3'])
        trip.imagen_3 = body_imagen_3['secure_url']
    if "imagen_4" in request.files:
        body_imagen_4 = cloudinary.uploader.upload(
            request.files['imagen_4'])
        trip.imagen_4 = body_imagen_4['secure_url']
    if "imagen_5" in request.files:
        body_imagen_5 = cloudinary.uploader.upload(
            request.files['imagen_5'])
        trip.imagen_5 = body_imagen_5['secure_url']
    if "imagen_6" in request.files:
        body_imagen_6 = cloudinary.uploader.upload(
            request.files['imagen_6'])
        trip.imagen_6 = body_imagen_6['secure_url']
    trip.destination = body_destination
    trip.start_of_the_trip = body_start_of_the_trip
    trip.end_of_the_trip = body_end_of_the_trip
    trip.people = body_people
    trip.transport = body_transport
    trip.cost = body_cost
    trip.text = body_text
    db.session.commit()
    return jsonify({"edited": True, "trip": trip.serialize()}), 200

# GET USER TRIPS

@api.route("/trips", methods=["GET"])
@jwt_required()
def get_user_trips():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        return jsonify({"trips": list(map(lambda trip: trip.serialize(), user.created_trip))}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 400

# GET USER TRIP BY ID

@api.route("/trips/<int:id>", methods=["GET"])
@jwt_required()
def get_user_trips_by_id(id):
    user = User.query.get(id)
    if user:
        return jsonify({"trips": list(map(lambda trip: trip.serialize(), user.created_trip))}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 400

# DELETE A TRIP

@api.route("/deleteTrip", methods=["DELETE"])  # ELIMINA EL TRIP
@jwt_required()
def delete_trip():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_trip_id = request.json.get("id")
    trip = Trip.query.get(body_trip_id)
    if user.id == trip.user_id_of_trip_creator:
        trip.likes.clear()
        db.session.commit()
        db.session.delete(trip)
        db.session.commit()
        return jsonify({"deleted": True}), 200
    else:
        return jsonify({"error": "Trip no eliminado"}), 400

# DELETE A PROFILE

@api.route("/deleteProfile", methods=["DELETE"])  # ELIMINA EL PERFIL
@jwt_required()
def delete_user():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        trips = Trip.query.filter_by(
            user_id_of_trip_creator=current_id)
        for trip in trips:
            matches = MatchTrip.query.filter_by(trip_id=trip.id)
            for match in matches:
                db.session.delete(match)
                db.session.commit()
            trip.likes.clear()
            db.session.commit()
            db.session.delete(trip)
            db.session.commit()
        matches = MatchTrip.query.filter_by(user_id=current_id)
        for match in matches:
            db.session.delete(match)
            db.session.commit()
        user.likes.clear()
        db.session.commit()
        db.session.delete(user)
        db.session.commit()
        return jsonify({"deleted": True}), 200
    else:
        return jsonify({"error": "User no eliminado"}), 400

# ADD LIKE TRIP

@api.route("/tripLikes", methods=["POST"])
@jwt_required()
def add_like_trip():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_trip_id = request.json.get("trip_id", None)
    if user:
        trip = Trip.query.get(body_trip_id)
        if user.id != trip.user_id_of_trip_creator:
            if user not in trip.likes:
                trip.likes.append(user)
                db.session.commit()
                return jsonify({"likeAdded": True}), 200
            else:
                trip.likes = list(
                    filter(lambda x: x.id != user.id, trip.likes))
                db.session.commit()
                return jsonify({"likeRemoved": True}), 200
        else:
            return jsonify({"error": "error"}), 400
    else:
        return jsonify({"error": "error"}), 400

# GET USER PROFILES

@api.route("/user/profiles", methods=["GET"])  # DEVUELVE EL PERFIL DEL USUARIO
@jwt_required()
def get_user_profiles():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        user_profiles = MatchTrip.query.filter_by(
            user_id=current_id).filter_by(accepted=True)
        return jsonify({"profiles": list(map(lambda profile: profile.serialize(), user_profiles))}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 400

# CREATE A TRIP

@api.route("/create/trip", methods=["POST"])
@jwt_required()
def create_trip():
    current_id = get_jwt_identity()
    body_destination = request.form.get("destination")
    body_start_of_the_trip = request.form.get("start_of_the_trip")
    body_end_of_the_trip = request.form.get("end_of_the_trip")
    body_people = request.form.get("people")
    body_transport = request.form.get("transport")
    body_cost = request.form.get("cost")
    body_text = request.form.get("text")
    body_destination_picture = "https://images.pexels.com/photos/358482/pexels-photo-358482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    body_imagen_1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    body_imagen_2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    body_imagen_3 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    body_imagen_4 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    body_imagen_5 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    body_imagen_6 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"  # NEW
    if "destination_picture" in request.files:
        body_destination_picture = cloudinary.uploader.upload(
            request.files['destination_picture'])['secure_url']
    if body_destination and body_start_of_the_trip and body_end_of_the_trip and body_people and body_transport and body_cost and body_destination_picture:
        new_trip = Trip(user_id_of_trip_creator=current_id, destination=body_destination, start_of_the_trip=body_start_of_the_trip, end_of_the_trip=body_end_of_the_trip,
                        people=body_people, transport=body_transport, text=body_text, cost=body_cost, destination_picture=body_destination_picture)
        db.session.add(new_trip)
        db.session.commit()
        return jsonify({"created": True, "trip": new_trip.serialize()}), 200
    else:
        return jsonify({"created": False, "msg": "Falta información"}), 400

# GET TRIPS

@api.route("/allTrips", methods=["GET"])
@jwt_required()
def get_trips():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if user:
        trips = Trip.query.filter(Trip.start_of_the_trip > date.today())
        # aca me hace un mapeo de una lista de instancia de clases.
        return jsonify({"trips": list(map(lambda trip: trip.serialize(), trips))}), 200
    else:
        return jsonify({"error": "error"}), 400

# GET TRIPS SEARCH

@api.route("/search", methods=["GET", "POST"])
def get_trips_search():
    requested_destination = request.json.get("destination")
    requested_start_date = request.json.get("date")
    requested_end_date = request.json.get("end_date")
    queries = [Trip.start_of_the_trip > date.today()]
    if requested_destination:
        queries.append(Trip.destination == requested_destination)
    if requested_start_date:
        queries.append(Trip.start_of_the_trip == requested_start_date)
    if requested_end_date:
        queries.append(Trip.end_of_the_trip == requested_end_date)
    destination_match = Trip.query.filter(*queries)
    return jsonify({"trip": list(map(lambda trip: trip.serialize(), destination_match))}), 200

# SEND MATCH

@api.route("/send/match", methods=["POST"])  # end point de metodo POST
@jwt_required()
def send_match():  # nombre de la función
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_trip_id = request.json.get("trip_id")
    body_message = request.json.get("message")
    trip = Trip.query.get(body_trip_id)
    body_read = request.json.get("read")
    # si user, trip y user.id son distintos de trip.user_id_of_trip_creator entonces ejecuta la siguiente linea.
    if user and trip and user.id != trip.user_id_of_trip_creator:
        if MatchTrip.query.filter_by(user=user).filter_by(trip=trip).first() is not None:
            return jsonify({"error": "ya existe"}), 420

        if trip.people > len(list(filter(lambda x: x.accepted == True, trip.trip_in_match))):
            match = MatchTrip(user=user, trip=trip,
                              message=body_message, read=body_read)
            db.session.add(match)
            db.session.commit()
        # si la condición se cumple retorna a la terminal de python send 200.
            return jsonify({"send": True}), 200
        else:
            return jsonify({"error": "llegas tarde"}), 400
    else:
        # si la condición no se cumple retorna a la terminal de python error 400.
        return jsonify({"error": "error"}), 400

#delete message

@api.route("/deleteMessage", methods=["DELETE"])  # ELIMINA EL TRIP
@jwt_required()
def delete_Message():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_message_id = request.json.get("id")
    if user:
        match = MatchTrip.query.get(body_message_id)
        db.session.delete(match)
        db.session.commit()
        return jsonify({"deleted": True}), 200
    else:
        return jsonify({"error": "message no eliminado"}), 400

# ACCEPT

@api.route("/accept", methods=["POST"])  # end point de metodo POST
@jwt_required()
def accept():  # nombre de la función
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_match_id = request.json.get("id")
    if user: # si user, trip y user.id son distintos de trip.user_id_of_trip_creator entonces ejecuta la siguiente linea.
        match = MatchTrip.query.get(body_match_id)
        match.accepted = True
        match.rejected = False
        db.session.commit()
        if MatchTrip.query.filter(MatchTrip.user == match.user, MatchTrip.trip == match.trip, MatchTrip.confirmed == True).first() is None:
            confirmed = MatchTrip(user = match.user, trip = match.trip, confirmed=True, message="Congratulations, your request is accepted.")
            db.session.add(confirmed)
            db.session.commit()
        # si la condición se cumple retorna a la terminal de python send 200.
        return jsonify({"send": True}), 200
    else:
        # si la condición no se cumple retorna a la terminal de python error 400.
        return jsonify({"error": "error"}), 400

@api.route("/reject", methods=["POST"])  # end point de metodo POST
@jwt_required()
def reject():  # nombre de la función
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    body_match_id = request.json.get("id")
    if user:  # si user, trip y user.id son distintos de trip.user_id_of_trip_creator entonces ejecuta la siguiente linea.
        match = MatchTrip.query.get(body_match_id)
        match.rejected = True
        match.accepted = False
        db.session.commit()
        message2 = MatchTrip.query.filter(MatchTrip.user == match.user, MatchTrip.trip == match.trip, MatchTrip.confirmed == True).first()
        if message2 is None:
            confirmed = MatchTrip(user = match.user, trip = match.trip, confirmed=True, message="Sorry, your request has been rejected.")
            db.session.add(confirmed)
            db.session.commit()
        else:
            message2.message = "Sorry, your request has been rejected."
            db.session.commit()
            
        # si la condición se cumple retorna a la terminal de python send 200.
        return jsonify({"send": True}), 200
    else:
        # si la condición no se cumple retorna a la terminal de python error 400.
        return jsonify({"error": "error"}), 400

@api.route("/read", methods=["PUT"])
@jwt_required()
def read():
    current_id = get_jwt_identity()
    trips = Trip.query.filter_by(user_id_of_trip_creator=current_id)
    for trip in trips:
        for match in trip.trip_in_match:
            match.read = True
            db.session.commit()
    user=User.query.get(current_id)
    matches = MatchTrip.query.filter_by(user = user)
    for match in matches:
        match.read=True 
        db.session.commit()
    
    return jsonify({"edited": True}), 200


@api.route("/messageA", methods=["GET"])
@jwt_required()
def messageA():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    messages = MatchTrip.query.filter(MatchTrip.user == user, MatchTrip.confirmed == True).all()
    return jsonify({"messages": list(map(lambda x:x.serialize(), messages))}),200