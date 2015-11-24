class Api::V1::NotesController < ApplicationController
  def index
    notes = Note.where(company_id: params["company_id"]).order(created_at: :desc)
    render json: notes.to_json(include: :user)
  end

  def create
    note = current_user.notes.build note_params

    Logger.new(STDOUT).info note
    if note.save
      render json: note.to_json(include: :user)
    else
      render json: {errors: note.errors.full_messages}, status: :bad_request
    end
  end

  private

  def note_params
    params.require(:note).permit(:body, :attachment, :company_id)
  end
end
