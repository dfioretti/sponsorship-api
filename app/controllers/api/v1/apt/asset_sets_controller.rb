class Api::V1::Apt::AssetSetsController < ApplicationController
    def index
        @asset_sets = AssetSet.all.order(name: :asc)
        render json: { asset_sets: @asset_sets } , include: 'asset_set_items'
    end

    def show
        @asset_set = AssetSet.find(params[:id])
        render json: @asset_set, include: 'asset_set_items'
    end

    def update
        @asset_set = AssetSet.find(params[:id])
        @asset_set.asset_set_items.delete_all
        if @asset_set.update_attributes(asset_set_params)
            render json: @asset_set, include: 'asset_set_items'
        else
            render json: {errors: @asset_set.errors.full_messages}, status: :bad_request
        end
    end

    def new
      @asset_set = AssetSet.new(:user_id => current_user.id)
      if @asset_set.save
          render json: @asset_set, include: 'asset_set_items'
      else
        render json: {errors: @asset_set.errors.full_messages,}, status: :bad_request
      end
    end

    private
    def asset_set_params
        params.require(:asset_set).permit(:name, :user_id, :updated_at, :asset_set_items_attributes => [ :asset_id, :_destroy ] )
    end
end
