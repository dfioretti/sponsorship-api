class Api::V1::NotesController < ApplicationController
  def index
    #notes = Note.includes(:user).recent_by_company(params[:company_id])
    #render json: notes.to_json(include: :user)
    render json: {notes: Note.all}
  end

  def create
    note = current_user.notes.build note_params

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
